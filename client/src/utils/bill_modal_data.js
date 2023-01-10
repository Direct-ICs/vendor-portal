// for a list of contacts, return an array of their info
const contactInfo = (billData) => {
  const accountData = JSON.parse(sessionStorage.getItem('account')).contact_persons;
  const rawData = accountData.filter((value) => {
    return value.email !== '';
  });

  return {
    name: rawData.map((person) => {
      return `${person.first_name} ${person.last_name}`;
    }),

    phone: rawData
      .filter((person) => {
        return person.phone !== "";
      })
      .map((items) => {
        return items.phone;
      }),

    email: rawData
    .filter((person) => {
      return person.email !== "";
    })
    .map((items) => {
      return items.email;
    }),
  };
};

// for a list of line items, return an array info
const lineItems = (billData) => {
  return billData.line_items.map((line_item) => {
    return { 
        name: line_item.name, 
        item_id: line_item.item_id, 
        quantity: line_item.quantity, 
        unit: line_item.unit, 
        description: line_item.description
      };
  });
};

const contactFormInfo = (billData) => {
  const contact = contactInfo(billData);
  return [
    {
      display: "Company Name",
      value: billData.customer_name,
      required: false,
      type: 'text'
    },
    {
      display: "Contact Name",
      value: contact.name,
      required: true,
      type: "select",
    },
    {
      display: "Contact Phone",
      value: contact.phone,
      required: true,
      type: "select",
    },
    {
      display: "Email",
      value: contact.email,
      required: true,
      type: "select",
    },
    // get contact phone and email from session storage
  ];
};

const orderDetailsFormInfo = (billData) => [
  {
    display: "Purchase Order Number",
    value: billData.custom_field_hash.cf_customer_po,
  },
  {
    display: "bill Number",
    value: billData.bill_number,
    
  },
  // RMA parts go last
  {
    display: "Select what you would like to RMA",
    value: lineItems(billData),
    required: true,
    type: "select-multiple",
  },
];

export const getData = (data) => {
  return {
    contactForm: contactFormInfo(data),
    orderDetailsForm: orderDetailsFormInfo(data),
  };
};
