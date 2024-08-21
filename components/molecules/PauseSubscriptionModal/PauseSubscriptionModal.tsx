import React, { useCallback, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RadioGroup } from '@headlessui/react';
import Close from 'assets/icons/close.svg';
import Button from 'components/atoms/Button';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import useFetchApi from 'hooks/useFetchApi';
import useNotificationStore from 'stores/notification';
import { NOTIFICATION_TYPE } from 'types/shared/notification';
import { API_ROUTES } from 'types/shared/api';
import {
  addMonthsFormatString,
  addMonthsFormatDate,
  addDaysToDate,
} from 'lib/utils/date';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface ActionButton {
  label: string;
  onClick: () => void;
  style?: BUTTON_STYLE;
}

export interface PauseSubscriptionModal {
  title: string;
  open: boolean;
  onClose: () => void;
  actionButtons: ActionButton[];
  subscriptionId: string;
  nextBillingDate: string;
  interval: number;
}

const PauseSubscriptionModal: React.FC<PauseSubscriptionModal> = ({
  title,
  open,
  onClose,
  actionButtons,
  subscriptionId,
  nextBillingDate,
  interval,
}) => {
  const [startDate, setStartDate] = useState(
    addDaysToDate(new Date().toDateString(), 1),
  );
  const [minDate] = useState(addDaysToDate(new Date().toDateString(), 1));

  const options = [
    {
      name: 'Pause Indefinitely',
      description: 'Pause your subscription with no end date.',
    },
    {
      name: 'Skip Next Cycle',
      description: `This will skip the next cycle of the subscription. The next billing date for this subscription is: `,
    },
    {
      name: 'Resume on Date',
      description: `This subscription will be resumed on: `,
    },
  ];

  const fetchApi = useFetchApi();
  const send = useNotificationStore((store) => store.send);

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const responseCallback = useCallback(
    async (res: Response, action: 'pause') => {
      const data = await res.json();

      const isSuccess = action === 'pause' && data?.paused;

      if (res.status === 200 && isSuccess) {
        send({
          message: 'Subscription has been paused',
          type: NOTIFICATION_TYPE.INFO,
        });
        window.location.reload();
      } else {
        send({
          message: 'Error found!',
          type: NOTIFICATION_TYPE.ERROR,
        });
      }
    },
    [send],
  );

  const errorCallback = useCallback(() => {
    send({
      message: 'Error found!',
      type: NOTIFICATION_TYPE.ERROR,
    });
  }, [send]);

  const pauseSubscription = useCallback(
    (status: boolean, resumeAt?: Date) =>
      fetchApi(
        {
          url: API_ROUTES.PAUSE_SUBSCRIPTION,
          options: {
            method: 'POST',
            body: JSON.stringify({ id: subscriptionId, status, resumeAt }),
          },
        },
        (res) => responseCallback(res, 'pause'),
        () => errorCallback(),
      ),
    [responseCallback, errorCallback, fetchApi, subscriptionId],
  );

  const handlePauseSubscription = () => {
    switch (selectedOption.name) {
      case 'Pause Indefinitely':
        handlePauseIndefinitely();
        break;
      case 'Skip Next Cycle':
        handleSkipNextCycle();
        break;
      case 'Resume on Date':
        handleDefineCustomDate();
        break;
      default:
        break;
    }
  };

  const handlePauseIndefinitely = () => {
    pauseSubscription(true);
  };

  const handleSkipNextCycle = () => {
    pauseSubscription(
      true,
      addMonthsFormatDate(nextBillingDate, interval ?? 0),
    );
  };

  const handleDefineCustomDate = () => {
    pauseSubscription(true, startDate);
  };

  return (
    <Transition show={open}>
      <Dialog as="div" onClose={onClose}>
        <Transition.Child
          as={Dialog.Backdrop}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 z-backdrop bg-[rgba(0,0,0,0.3)]"
        />
        <Transition.Child
          as={Dialog.Panel}
          enter="duration-700 md:duration-400"
          enterFrom="translate-y-full md:-translate-y-1/2 md:opacity-0 md:scale-95"
          enterTo="translate-y-0 md:-translate-y-1/2 md:opacity-100 md:scale-100"
          leave="duration-500 md:duration-300"
          leaveFrom="translate-y-0 md:-translate-y-1/2 md:opacity-100 md:scale-100"
          leaveTo="translate-y-full md:-translate-y-1/2 md:opacity-0 md:scale-95"
          className="shadow-xl fixed bottom-0 left-0 z-modal flex h-fit w-full flex-col rounded-t-xl bg-background-primary p-6 text-left align-middle transition-[opacity,_transform] md:left-1/2 md:top-1/2 md:max-w-2xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl">
          <div className="flex items-center justify-between">
            <Dialog.Title
              as="h3"
              className="font-headings text-md font-semibold uppercase text-primary">
              {title}
            </Dialog.Title>
          </div>
          <RadioGroup
            value={selectedOption}
            onChange={setSelectedOption}
            className="space-y-4">
            <RadioGroup.Label className="sr-only">
              Pause Options
            </RadioGroup.Label>
            <div className="flex space-x-4">
              {options.map((option) => (
                <RadioGroup.Option
                  key={option.name}
                  value={option}
                  className={() =>
                    `relative flex cursor-pointer rounded-lg px-4 py-2 focus:outline-none`
                  }>
                  {() => (
                    <>
                      <div className="flex items-center">
                        <div className="flex h-5 items-center">
                          <div
                            className={`h-4 w-4 rounded-full ${
                              option.name === selectedOption?.name
                                ? 'border-4 border-primary'
                                : 'border-secondary border-2'
                            }`}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <RadioGroup.Label
                            as="p"
                            className="font-normal text-body">
                            {option.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
            <div className="mt-2 text-sm text-body">
              {selectedOption.description}
              {selectedOption.name == 'Skip Next Cycle' && (
                <span className="font-bold">
                  {addMonthsFormatString(nextBillingDate, interval ?? 0)}
                </span>
              )}

              {selectedOption.name === 'Resume on Date' && (
                <DatePicker
                  minDate={minDate}
                  selected={startDate}
                  onChange={(date: Date | null) => {
                    if (date) {
                      setStartDate(date);
                    }
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="border-secondary flex rounded-md border-2 p-2"
                />
              )}
            </div>
          </RadioGroup>
          <div className="mt-8 flex space-x-2 pt-2">
            {actionButtons.map(({ label, onClick, style }, i) => (
              <Button
                key={`${label}${i}`}
                elType={BUTTON_TYPE.BUTTON}
                buttonStyle={style}
                onClick={onClick}
                className="text-center"
                fullWidth
                tabIndex={0}>
                {label}
              </Button>
            ))}
            <Button
              key={`1`}
              elType={BUTTON_TYPE.BUTTON}
              buttonStyle={BUTTON_STYLE.DANGER}
              onClick={handlePauseSubscription}
              className="text-center"
              fullWidth
              tabIndex={0}>
              Pause
            </Button>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-6 top-[27.6px]">
            <Close className="w-[16.6px]" />
          </button>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default PauseSubscriptionModal;
