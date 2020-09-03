const contactFormatter = (contactArray) => {

  const MAX = 3;

  const contactMapper = (contact) => {
    
    contact.addresses = contact.addresses? contact.addresses.concat((new Array (MAX).fill({formattedAddress: null}))).slice(0, MAX) : new Array (MAX).fill({formattedAddress: null});

    const addresses = contact.addresses.reduce((obj, currentAddressObj, index) => {
      
      obj[`address${index}`] = currentAddressObj.formattedAddress?currentAddressObj.formattedAddress.replace('\n', ' ') : null;
      
      return obj;
    }, {});

    contact.emails = contact.emails? contact.emails.concat((new Array (MAX).fill({email: null}))).slice(0, MAX) : new Array (MAX).fill({email: null});

    const emails = contact.emails.reduce((obj, currentEmailObj, index) => {
      
      obj[`email${index}`] = currentEmailObj.email;
      
      return obj;
    }, {});

    contact.phoneNumbers = contact.phoneNumbers? contact.phoneNumbers.concat((new Array (MAX).fill({number: null}))).slice(0, MAX) : new Array (MAX).fill({number: null});

    const phoneNumbers = contact.phoneNumbers.reduce((obj, currentPhoneNumberObj, index) => {
      
      obj[`phonenumber${index}`] = currentPhoneNumberObj.number;
      
      return obj;
    }, {});  

    delete contact['addresses'];
    delete contact['emails'];
    delete contact['phoneNumbers'];
    delete contact['contactType'];
    delete contact['firstName'];
    delete contact['imageAvailable'];
    delete contact['lastName'];
    delete contact['lookupKey'];
    delete contact['middleName'];


    return {...contact, ...addresses, ...emails, ...phoneNumbers};
  };

  return contactArray.map(contactMapper);
}

export default contactFormatter;