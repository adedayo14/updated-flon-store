import React from 'react';
import { BUTTON_TYPE, BUTTON_STYLE } from 'types/shared/button';
import Button from './atoms/Button';
import useNotificationStore from 'stores/notification';
import { NOTIFICATION_TYPE } from 'types/shared/notification';
// import { useRouter } from 'next/router';
import type { SpecialCard } from 'pages/account/cards';
import { useCardContext } from 'utils/contexts/cardContext';
import { API_BASE_URL } from 'config';

interface CardProps {
  card: SpecialCard;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const send = useNotificationStore((store) => store.send);
  const { cards, setCards } = useCardContext();

  const handleDelete = async (id: string | undefined) => {
    try {
      if (!id) {
        send({
          message: 'Card ID is missing',
          type: NOTIFICATION_TYPE.ERROR,
        });
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/swell/cards/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        send({
          message: 'Card deleted successfully',
          type: NOTIFICATION_TYPE.SUCCESS,
        });

        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards); // Update the context with the updated cards array
      } else {
        send({
          message: 'Failed to delete card',
          type: NOTIFICATION_TYPE.ERROR,
        });
        console.error('Failed to delete card');
      }
    } catch (error) {
      send({
        message: 'Error deleting card',
        type: NOTIFICATION_TYPE.ERROR,
      });
    }
  };

  const handleSetAsDefault = async (id: string | undefined) => {
    try {
      if (!id) {
        send({
          message: 'Card ID is missing',
          type: NOTIFICATION_TYPE.ERROR,
        });
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/swell/cards/${id}/default`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        send({
          message: 'Saved. This is now your default card.',
          type: NOTIFICATION_TYPE.SUCCESS,
        });
        // Update cards to reflect new default
        const updatedCards = cards.map((c) => ({
          ...c,
          default: c.id === id,
        }));
        setCards(updatedCards);
      } else {
        send({
          message: 'Failed to set as default card',
          type: NOTIFICATION_TYPE.ERROR,
        });
      }
    } catch (error) {
      send({
        message: 'Error setting default card',
        type: NOTIFICATION_TYPE.ERROR,
      });
    }
  };

  return (
    <div className="space-y-12 md:mt-12">
      <div 
        className={`border-outline relative rounded-xl border bg-background-primary p-6 ${
          card.default ? 'border-l-4 border-l-teal-500 bg-teal-50/30' : ''
        }`}
        role="article"
        aria-label={card.default ? "Default card" : "Payment card"}
      >
        {/* Header with card info and default badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Mobile: checkmark at far left */}
            {card.default && (
              <div className="flex md:hidden">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <div className="text-lg font-semibold text-body">
              {card.brand ? card.brand.charAt(0).toUpperCase() + card.brand.slice(1).toLowerCase() : 'Card'} ending in {card.last4}
            </div>
          </div>
          
          {/* Default badge - desktop/tablet */}
          {card.default && (
            <span 
              className="hidden md:flex items-center text-teal-700 bg-teal-100 rounded-full px-3 py-1 text-sm font-medium"
              aria-label="Default card"
            >
              <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Default
            </span>
          )}
        </div>

        {/* Mobile: Default badge */}
        {card.default && (
          <div className="flex md:hidden mb-4">
            <span 
              className="flex items-center text-teal-700 bg-teal-100 rounded-full px-3 py-1 text-sm font-medium"
              aria-label="Default card"
            >
              <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Default
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          {/* Set as default link for non-default cards */}
          {!card.default && (
            <button
              onClick={() => handleSetAsDefault(card.id)}
              className="text-teal-600 hover:text-teal-700 text-sm font-medium underline focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
              aria-pressed="false"
            >
              Set as default
            </button>
          )}
          
          {/* Delete button */}
          <div className="flex gap-2 sm:ml-auto">
            <Button
              elType={BUTTON_TYPE.BUTTON}
              onClick={() => handleDelete(card.id)}
              buttonStyle={BUTTON_STYLE.SECONDARY}
              small
              className="whitespace-nowrap focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardsSection: React.FC = () => {
  const { cards } = useCardContext();
  
  // Sort cards to put default first
  const sortedCards = [...cards].sort((a, b) => {
    if (a.default && !b.default) return -1;
    if (!a.default && b.default) return 1;
    return 0;
  });
  
  return (
    <div className="mt-8">
      {sortedCards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardsSection;
