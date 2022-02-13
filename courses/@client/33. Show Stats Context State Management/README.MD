# Show Stats Context Management
```js
actions.js

// TODO: Show Stats
export const SHOW_STATS = 'SHOW_STATS';
export const SHOW_STATS_SUCCESS = 'SHOW_STATS_SUCCESS';

```
```js
appContext.js

const initialState = {
  stats: {},
  monthlyApplications: []

}

const showStats = async () => {
    dispatch({ type: SHOW_STATS })
    try {
      const { data } = await authFetch('/jobs/stats')
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      })
    } catch (error) {
console.log(error.response)
      // logoutUser()
    }

clearAlert()
  }
  value={{showStats}}
```
```js
    /* TODO: SHOW STATS */
    case SHOW_STATS:
      return { ...state, isLoading: true, showAlert: false}
    case SHOW_STATS_SUCCESS:
      return { ...state, isLoading: false, stats: action.payload.stats, monthlyApplication: action.payload.monthlyApplication}
    
```