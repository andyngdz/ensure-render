# use-react-common

## Description

Common functionalities for React

## Getting Started

### Installing

- yarn install
- yarn build

## Authors

- Andy D. Ng <itc.anhduy@gmail.com>

## Function

```
<!-- data here can be undefined -->
const data = Promise....

return Render.ensure(
    <!-- readyData is just the data, but it's not undefined here -->
    readyData => {
        return <div>
           {readyData.a}
        </div>
    },
    data -> Put data here as the second parameter,
    onLoading: () => <Loading /> -> Show loading component when data is undefined
)
```

```
useSort
```

Take a look here: https://use-sort.vercel.app/

## Version History

- 1.0.6

  - Update README

- 1.0.5

  - Fix useSort export

- 1.0.4

  - Add useSort

- 1.0.3

  - Fix main file. It shuold be `dist/index.js` not (.ts)

- 1.0.2

  - Fix module not found

- 1.0.1

  - Fix render sure type. It should return `React.ReactElement`

- 1.0.0
  - Initial Release
  - Add render

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
