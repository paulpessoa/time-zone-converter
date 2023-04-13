import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import TimezoneConverter from './components/TimezoneConverter';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="15vmin" pointerEvents="none" />
            <TimezoneConverter/>
          </VStack>
        </Grid>
      </Box>

    </ChakraProvider>
  );
}

export default App;
