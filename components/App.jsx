import React, { useState } from 'react';
import Axios from 'axios';
import Autocomplete from './Autocomplete';
import countries from '../data';
import '../style.css';

const App = () => {
    const [data, setData] = useState('');
    const [valueField, setValueField] = useState('');

    const fetchData = (e, options) => {
        setValueField(e.target.value);
        const { countries } = options;
        Axios.post('/countries', { params: { input: e.target.value, options: countries }})
          .then( res => setData(res.data))
    };

    const renderItem =  data => (
        <ul>
            {data.map((item, index) => (
            <li key={index}>
                <input value={item} onClick={changeValue} readOnly/>
            </li>))}
        </ul>
    );

    const changeValue = e => {
        setValueField(e.target.value);
        setData('');
    };

    return (
      <div>
        <h1>Autocomplete</h1>
        <Autocomplete
            fetchData={fetchData}
            data={data}
            placeholder={'Country'}
            textField={'Choose country'}
            renderItem={renderItem}
            options={countries}
            valueField={valueField}
            changeValue={changeValue}
            className={'autocomplete'}         
        />
      </div>
  )
};

export default App;

// Autocomplete.PropTypes = {
//     fetchData: PropTypes.func.isRequired,
//     valueField: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
//     textField: PropTypes.string.isRequired,
//     noOptionMessage: PropTypes.string,
//     className: PropTypes.string,
//     // menuClassName: PropTypes.string,
//     placeholder: PropTypes.string,
//     label: PropTypes.string,
//     // options: PropTypes.object.isRequired,
//     onChange: PropTypes.func.isRequired,
//     renderItem: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
// };
