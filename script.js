let form = document.querySelector('form');

window.onerror = function(message, source, lineno, colno, error) {
  console.log('Global error caught:', message);
  return true;
};

form.addEventListener('submit', e => {
    e.preventDefault();
    let output = document.querySelector('output');
    
    try {
        let firstNum = document.querySelector('#first-num').value;
        let secondNum = document.querySelector('#second-num').value;
        let operator = document.querySelector('#operator').value;
        
        if (firstNum === '' || secondNum === '') {
            throw new Error('Both numbers must be provided');
        }
        
        let num1 = parseFloat(firstNum);
        let num2 = parseFloat(secondNum);
        
        if (isNaN(num1) || isNaN(num2)) {
            throw new Error('Inputs must be valid numbers');
        }
    
        if (operator === '/' && num2 === 0) {
            throw new Error('Cannot divide by zero');
        }
        
        let result = eval(`${num1} ${operator} ${num2}`);
        output.innerHTML = result;
        
    } catch (error) {
        console.error('Calculation error:', error.message);
        output.innerHTML = `Error: ${error.message}`;
    } finally {
        console.log('Calculator operation completed');
    }
});

let errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

const entries = document.getElementById('log-entries');
let groupDepth = 0;
let timerStart = null;
let countMap = {};

const sampleData  = { name: 'Nat', age: 20, major: 'Computer Science'};
const friends = [
  { name: 'Nat',  age: 20,  major: 'Computer Science' },
  { name: 'Sherry', age: 20, major: 'Neurobiology' },
  { name: 'Enzo', age: 20, major: 'Biochemistry'},
  { name: 'Dylan', age: 20, major: 'Cognitive Science'}
];


class FakeError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'FakeError';
    this.field = field;
  }
}

errorBtns[0].onclick = () => console.log('User object:', sampleData);

errorBtns[1].onclick = () => {
  try {
    let invalidJSON = '{"name": "Nat", "age": 20, incomplete}';
    let parsed = JSON.parse(invalidJSON);
    console.log('Parsed:', parsed);
  } catch (error) {
    console.error('JSON Parse Error:', error.message);
  } finally {
    console.log('JSON parsing attempt finished');
  }
};

errorBtns[2].onclick = () => {
  countMap['btn-clicks'] = (countMap['btn-clicks'] || 0) + 1;
  console.count('btn-clicks');   
};

errorBtns[3].onclick = () => {
  try {
    const validateFriend = (friend) => {
      if (!friend.name || friend.name.trim() === '') {
        throw new FakeError('Friend must have a valid name', 'name');
      }
      if (!Number.isInteger(friend.age) || friend.age < 0 || friend.age > 120) {
        throw new FakeError(`Invalid age: ${friend.age}. Age must be between 0 and 120`, 'age');
      }
      if (!friend.major || friend.major.trim() === '') {
        throw new FakeError('Friend must have a major', 'major');
      }
    };
    
    validateFriend(friends[0]);
    console.log('Friend validation successful for:', friends[0].name);
    
    let badFriend = { name: '', age: -5, major: '' };
    validateFriend(badFriend);
    
  } catch (error) {
    if (error instanceof FakeError) {
      console.error(`${error.name} in field '${error.field}':`, error.message);
    } else {
      console.error('Unexpected error:', error.message);
    }
  }
};

errorBtns[4].onclick = () => {
  try {
    const multiply = (a, b) => {
      if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('Both arguments must be numbers');
      }
      return a * b;
    };
    
    let result = multiply(5, 4);
    console.assert(result === 20, 'Multiplication result should be 20, got ' + result);
    
    let badResult = multiply(5, 4);
    console.assert(badResult === 25, `Expected 25 but got ${badResult} - Math is broken!`);
    
  } catch (error) {
    console.error('Calculation assertion failed:', error.message);
  }
};

errorBtns[5].onclick = () => console.clear();

errorBtns[6].onclick = () => console.dir(sampleData);  

errorBtns[7].onclick = () => console.dirxml(document.body);

errorBtns[8].onclick = () => console.group();

errorBtns[9].onclick = () => console.groupEnd();        

errorBtns[10].onclick = () => console.table(friends); 

errorBtns[11].onclick = () => {
  try {
    let timerName = 'api-request-timer';
    
    console.time(timerName);
    
    const processData = () => {
      let data = null;
      if (!data) {
        throw new Error('No data available to process');
      }
      return data;
    };
    
    let result = processData();
    
  } catch (error) {
    console.error('Timer operation failed:', error.message);
  } finally {
    try {
      console.timeEnd('api-request-timer');
    } catch (e) {
      console.warn('Note: Timer was never started or already ended');
    }
  }
}; 

errorBtns[12].onclick = () => console.timeEnd('demo-timer');

errorBtns[13].onclick = () => {
  function outer() { function inner() { console.trace('Trace from inner()'); } inner(); }
  outer();
};

errorBtns[14].onclick = () => {
  console.log('Attempting to call undefined function...');
  undefinedFunction();
};

