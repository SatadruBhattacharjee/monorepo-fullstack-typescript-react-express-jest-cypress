import React, { useState, useEffect } from 'react';
import { CardForm, Table, Status } from '@test-workspace/ui';
import { ICreditCard, IFormField } from '@test-workspace/model';
import { IHttpResponse, get, post } from '@test-workspace/common';

import './app.scss';

// Form JSON structure to gegerate the Credit Card Form
const CardFields: IFormField[] = [
  {
    label: 'Name',
    id: 'name',
    placeholder: 'Name on Card',
    type: 'text',
    options: {
      required: true,
      type: 'cardName'
    }
  },
  {
    label: 'Card Number',
    id: 'number',
    placeholder: '10 digit card number',
    type: 'number',
    options: {
      required: true,
      type: 'cardNumber'
    }
  },
  {
    label: 'Limit (£)',
    id: 'limit',
    placeholder: 'Card Limit (£)',
    type: 'number',
    options: {
      required: true,
      type: 'cardLimit'
    }
  }
];

const API_URL = '/api/v1/card';

export const App: React.SFC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState({ message: '' });
  const [data, setData] = useState(null);
  const [postStatus, setPostStatus] = useState(false);
  const [url, setUrl] = useState(`${API_URL}?_preventCache=${Math.random()}`);

  const handleFormSubmit = async (formData: ICreditCard) => {
    formData.balance = 0; //New Card Starts with 0 balance
    setError(false);
    setPostStatus(false);
    try {
      const response: IHttpResponse<ICreditCard> = await post<ICreditCard>(
        API_URL,
        formData
      );
      setUrl(`${API_URL}?_preventCache=${Math.random()}`);
      setPostStatus(true);
    } catch (error) {
      setError(true);
      setErrorMessage(error.parsedBody);
      setPostStatus(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        let response: IHttpResponse<ICreditCard[]> = await get<ICreditCard[]>(
          url
        );
        setData(response.parsedBody);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <div className="container">
      {loading ? <div>Loading ...</div> : ''}
      <CardForm
        fields={CardFields}
        onFormSubmit={handleFormSubmit}
        submitText="Add"
      />
      {error && !postStatus && (
        <Status type="error" message={errorMessage.message} />
      )}
      {!error && postStatus && (
        <Status type="success" message="The Card is added successfully" />
      )}

      {data && <Table data={data} />}
    </div>
  );
};

export default App;
