import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  components: {
    ModalContent: {
      baseStyle: {
        bg: 'gray.800',
        color: '#181B23',
      },
    },
  },
  colors: {
    gray: {
      '900': '#181B23',
      '800': '#1F2029',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '400': '#797D9A',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#DD1DC',
      '50': '#EEEEF2',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
    },
  },
});
