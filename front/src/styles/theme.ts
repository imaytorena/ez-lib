// import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react'

// const Button: ComponentStyleConfig = {
//   baseStyle: {
//     _light:{
//       bg: "bg.dark",
//       color: "color.dark"
//     },
//     _dark:{
//       bg: "bg.light",
//       color: "color.light"
//     }
//   }
// }

// export const theme = extendTheme({
//   colors: {
//     bg: {
//       light: "#dbdad6",
//       dark: "#202020"
//     },
//     color: {
//       light: "#202020",
//       dark: "#dbdad6",
//     },
//     gray: {
//       700: "#2d333b",
//       800: "#22272e",
//     },

//   },
//   styles: {
//     global: (props) => ({
//       body: {
//         bg: props.colorMode === "light" ? "bg.light" : "bg.dark",
//         color: props.colorMode === "light" ? "color.light" : "color.dark"
//       }
//     })
//   },
//   components: {
//     Button,
//   }
// })
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      700: "#2d333b",
      800: "#22272e",
    },

  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "light" ? "gray.50" : "gray.800",
        color: props.colorMode === "light" ? "gray.600" : "gray.100"
      }
    })
  }
})
