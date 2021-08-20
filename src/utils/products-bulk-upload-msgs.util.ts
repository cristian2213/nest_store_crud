export const errorMessages = {
  providerId: {
    empty: 'The provider identification empty',
    notFound: 'Impossible save, the provider does not exist into database',
  },
  price: {
    empty: 'The product price is empty',
    void: 'The product price is void',
    cero: 'The product contains a price of cero (0)',
  },
  name: {
    void: 'The product name is empty or the length of the name is greater than 255 characters',
  },

  global: {
    repeated: 'Repeated product',
  },

  bulkUploadMsg: (err: Error) => {
    return {
      error: 'Fatal error in bulk allocation to database!',
      desc: err.message,
    };
  },
};
