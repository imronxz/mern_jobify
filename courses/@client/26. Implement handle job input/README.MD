#### Context State Management for handle job input
- actions.js
```js
export const HANDLE_CHANGE = 'HANDLE_CHANGE';
```
- reducer.js
```js
import { HANDLE_CHANGE } from './actions';
import { initialState } from './appContext';

case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
```
- appContext.js
```js

// * Handle Change
import { HANDLE_CHANGE } from './actions';

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE ,payload:{name, value}});
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        authUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange
      }}
    >
      {children}
    </AppContext.Provider>
  );

```
- pages/dashboard/AddJob.js
```js
import { useAppContext } from '../../context/appContext';
const AddJob = () => {
  const {handleChange} = useAppContext();

  //! TODO: on change input event target
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({name, value})
  };
}
```