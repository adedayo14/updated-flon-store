module.exports = {
  name: 'reviews',
  fields: [
    {
      name: 'product_id',
      type: 'string',
      required: true,
      indexed: true
    },
    {
      name: 'user_id',
      type: 'string',
      required: true,
      indexed: true
    },
    {
      name: 'order_id',
      type: 'string',
      indexed: true
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5
    },
    {
      name: 'title',
      type: 'string',
      required: true,
      max_length: 255
    },
    {
      name: 'review_body',
      type: 'text',
      required: true,
      min_length: 50,
      max_length: 2000
    },
    {
      name: 'is_approved',
      type: 'boolean',
      default: false,
      indexed: true
    },
    {
      name: 'is_verified_purchase',
      type: 'boolean',
      default: false,
      indexed: true
    },
    {
      name: 'status',
      type: 'string',
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      indexed: true
    },
    {
      name: 'helpful_count',
      type: 'number',
      default: 0
    },
    {
      name: 'reported_count',
      type: 'number',
      default: 0
    },
    {
      name: 'approved_at',
      type: 'datetime'
    },
    {
      name: 'approved_by',
      type: 'string'
    },
    {
      name: 'rejection_reason',
      type: 'text'
    },
    {
      name: 'images',
      type: 'array',
      items: {
        type: 'object',
        fields: [
          {
            name: 'image_url',
            type: 'string',
            required: true
          },
          {
            name: 'alt_text',
            type: 'string'
          }
        ]
      }
    },
    {
      name: 'interactions',
      type: 'array',
      items: {
        type: 'object',
        fields: [
          {
            name: 'user_id',
            type: 'string',
            required: true
          },
          {
            name: 'type',
            type: 'string',
            enum: ['helpful', 'report'],
            required: true
          },
          {
            name: 'created_at',
            type: 'datetime',
            required: true
          }
        ]
      }
    }
  ],
  hooks: {
    before_create: async (context) => {
      // Set default values
      context.data.created_at = new Date().toISOString();
      context.data.updated_at = new Date().toISOString();
      
      // Check if user has purchased the product
      const orders = await context.app.models.orders.find({
        account_id: context.data.user_id,
        status: 'completed'
      });
      
      const hasPurchased = orders.some(order => 
        order.items.some(item => item.product_id === context.data.product_id)
      );
      
      context.data.is_verified_purchase = hasPurchased;
      
      return context;
    },
    before_update: async (context) => {
      context.data.updated_at = new Date().toISOString();
      return context;
    }
  }
}; 