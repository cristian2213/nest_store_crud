export const erroMsgs = {
  providerId: {
    empty: 'The provider identification empty',
    notFound: 'The provider pasted does not exist into database',

    notPositive:
      'The provider identification is not positive type or it is cero',
  },
  price: {
    void: 'The product price is null',
    cero: 'The product contains a price of cero (0)',
  },
  name: {
    num: 'The product name is numeric',
    empty: 'The product name is empty',
    limit: 'The product name is very long',
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
