import React from 'react';
import { SUBSCRIPTION_STATUS } from 'types/subscription';
import { BUTTON_STYLE } from 'types/shared/button';

interface SubscriptionAction {
  label: string;
  description: string;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

interface ModernSubscriptionActionsProps {
  status: SUBSCRIPTION_STATUS;
  onEdit: () => void;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
}

const ModernSubscriptionActions: React.FC<ModernSubscriptionActionsProps> = ({
  status,
  onEdit,
  onPause,
  onResume,
  onCancel,
}) => {
  const getActions = (): SubscriptionAction[] => {
    const baseActions: SubscriptionAction[] = [
      {
        label: 'Edit plan',
        description: 'Change quantity, frequency, or billing',
        onClick: onEdit,
        variant: 'primary',
      },
    ];

    if (status === SUBSCRIPTION_STATUS.ACTIVE) {
      baseActions.push({
        label: 'Pause subscription',
        description: 'Temporarily stop deliveries',
        onClick: onPause,
        variant: 'secondary',
      });
    }

    if (status === SUBSCRIPTION_STATUS.PAUSED) {
      baseActions.push({
        label: 'Resume subscription',
        description: 'Restart deliveries and billing',
        onClick: onResume,
        variant: 'secondary',
      });
    }

    if (status !== SUBSCRIPTION_STATUS.CANCELED) {
      baseActions.push({
        label: 'Cancel subscription',
        description: 'End this subscription permanently',
        onClick: onCancel,
        variant: 'danger',
      });
    }

    return baseActions;
  };

  const actions = getActions();

  const getButtonStyles = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white';
      case 'secondary':
        return 'border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white';
      case 'danger':
        return 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white';
      default:
        return 'border-gray-300 text-gray-700 hover:bg-gray-50';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-10 text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Manage subscription</h2>
      <p className="text-sm text-gray-600 mb-8">You're in control.</p>

      <div className={`grid gap-6 ${actions.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
            className={`
              flex flex-col items-center gap-2 p-6 border rounded-lg bg-white
              transition-all duration-200 transform hover:-translate-y-0.5
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
              ${getButtonStyles(action.variant)}
            `}
          >
            <div className="text-sm font-semibold">{action.label}</div>
            <div className="text-xs opacity-75 text-center leading-tight">
              {action.description}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          Need help? <strong className="text-gray-900">Contact our support team</strong> for
          assistance with your subscription.
        </p>
      </div>
    </div>
  );
};

export default ModernSubscriptionActions;
