## 1. What is the difference between Component and PureComponent? give anexample where it might break my app. 

The difference between React Component and Pure Component is that the pure components doesn’t re-render when parent props changes. This behavior can be also implemented with `React.memo`. I’m gonna give two implementations with Pure Components that could break your App: 
    1. The obvious case where you really need that your component updates when the parent state or the props changes.
    2. If you need that the children of the Pure component re-render, you won’t be success, because the children of a Pure Component should be Pure as well.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

When you have a React.Context you have a `Context.Provider` and multiple consumers, that will be re-rendered each time that the Provider value changes, so if you use `shouldComponentUpdate` on the provider and updates the value you will re-render all it’s consumers.

## 3. Describe 3 ways to pass information from a component to its PARENT.

To send data from a child component to a parent component you can: 
    1. Return a ref from child and access it on parent
    2. Implement a parent context 
    3. Send a function from parent to child, and this function that will be executed on the child, send the data:
        
        ```jsx
          
        function ChildComponent({setData}) {
        	return <button onClick={setData} > Send data to parent </button>
        }

        function ParentComponent() {
        	const [data, setData] = useState(defaultState)
        	
        	const handleSetData = (newState) => {
        		setData(newState)
        	}
        
        	return <Child setData={handleSetData} />
        }
      
        ```
        
## 4. Give 2 ways to prevent components from re-rendering.

To prevent components to re-render when the props changes you can use `React.memo(Component, validation)` or you can try with `useMemo` when you need to prevent a re-render caused by a function calculation.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

. Fragment is a wrapper provided by React to wrap sibling elements in a virtual node that will not render any html tag. It can break your App if you conditionally render the content of the Fragment with undefined returns.
    
    ```jsx
    
    // This could return undefined inside the fragment.
    
    return (
    	<>
    		{ open && <Dialog /> }
    		{ open && <Banner /> }
    	</>
    )
    ```
    
## 6. Give 3 examples of the HOC pattern.
Three examples that uses the HOC pattern:
    1. The connect method on redux works with this pattern 
    2. React.memo also
    3. You can build your own HOC whenever you need to reuse logic or centralize data! 
    4. Extra: using the React.Context api is a HOC pattern too.

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.
Handling exceptions in callbacks could be more tricky because you need to handle each function exception, in the other hand with promises and try catch you propagate the errors to the catch block.
    
    ```jsx
    try {
    	const req1 = await fetch()
    	const req2 = await fetch2()
    	const req3 = await fetch3()
    } catch(err) {
    	// handle the error just once
    	console.error(err)
    }
    
    function fetch(cb) {
    	// do your stuff and handle the error
    	if(cb){
    		cb()
    	}
    }
    
    function fetch2(cb) {
    	// do your stuff and handle the error
    	if(cb) {
    		cb()
    	}
    }
    
    function fetch3(cb) {
    	// do your stuff and handle the error
    	if(cb) {
    		cb()
    	}
    }
    
    function main() {
    	fetch(fetch2(fetch3))
    }
    
    ```
    
## 8. How many arguments does setState take and why is it async.
React.setState() receives two argument the first one is the default state and can be a literal, an object or an updater function, the second argument is a callback that will be executed after setState function execution finish.

## 9. List the steps needed to migrate a Class to Function Component.
In general to migrate a class based component to a functional component you should:
    1. Change the class for a function and convert class methods to functions
    2. Remove constructor and move state implementation to useState hook
    3. Remove `this` calls and event handler bindings
    4. Replace lifecycle methods by react hooks
    5. Replace Pure components by React.memo HOC

## 10. List a few ways styles can be used with components.
There is A LOT of styling solutions for React components, just to mention some of them:
    1. plain css
    2. css in js 
    3. inline js 
    4. Sass, SCSS
    5. Styled components
    6. Emotion
    7. tailwind classes (my favorite, combined with styled components).

## 11. How to render an HTML string coming from the server.
That’s simple! You can use the `dangerouslySetInnerHTML` html property, but remember that it is dangerous because you are exposing your users to an attack.