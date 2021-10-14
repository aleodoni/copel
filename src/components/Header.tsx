import { Flex, Text, Button, HStack, Box } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useRouter } from 'next/router';
import { useState } from 'react';

export const Header = () => {
  const date = new Date();
  const formatted = format(date, 'dd/MM/yyyy')
  const [number, setNumber] = useState('')
  const [error, setError] = useState(null)

  const router = useRouter()

  function handleClick(value: string): void {
    setNumber(number + value)
  }

  function handleClean(): void {
    setNumber('');
  }

  function handleVoltar(): void {
    router.back();
  }

  async function handleSubmit(): Promise<void> {
    const body = { date, number }

    const resp = await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if(resp.status === 200) {
      setError(null)
      setNumber('')
      router.push('/')
    } else {
      setError('Erro ao inserir leitura')
    }
  }

  return (
    <Flex 
      alignItems="center"
      direction="column"
    >
      <Text fontSize="4xl">{formatted}</Text>
      <HStack spacing={4} mt={4} w="full" justifyContent="center" bg="gray.800">
        <Box >
          {number === '' ? 
            <Text fontSize="4xl">0</Text>
           : <Text fontSize="4xl">{number}</Text>}
          
        </Box>
      </HStack>
      <HStack spacing={4} mt={4} w="full" justifyContent="space-between">
        <Button colorScheme="orange" size="lg" onClick={() => handleClick('1')}>1</Button>
        <Button colorScheme="orange" size="lg" onClick={() => handleClick('2')}>2</Button>
        <Button colorScheme="orange" size="lg" onClick={() => handleClick('3')}>3</Button>
      </HStack>
      <HStack spacing={4} mt={4} w="full" justifyContent="space-between">
        <Button colorScheme="orange" size="lg" onClick={() => handleClick('4')}>4</Button>
        <Button colorScheme="orange" size="lg" onClick={() => handleClick('5')}>5</Button>
        <Button colorScheme="orange" size="lg" onClick={() => handleClick('6')}>6</Button>
      </HStack>
      <HStack spacing={4} mt={4} w="full" justifyContent="space-between">
        <Button colorScheme="orange" size="lg" onClick={() => handleClick('7')}>7</Button>
        <Button colorScheme="orange" size="lg" onClick={() => handleClick('8')}>8</Button>
        <Button colorScheme="orange" size="lg" onClick={() => handleClick('9')}>9</Button>
      </HStack>
      <HStack spacing={4} mt={4} w="full" justifyContent="space-between">
        <Button colorScheme="orange" size="lg" onClick={() => handleClick('0')}>0</Button>
        <Button colorScheme="orange" size="lg" onClick={() => handleClean() }>C</Button>
      </HStack>
      <HStack spacing={4} mt={4} w="full" justifyContent="center">
        <Button colorScheme="orange" size="lg" w="full" onClick={() => handleSubmit()}>Salvar</Button>
        <Button size="lg" colorScheme="orange" w="full" onClick={() => handleVoltar()}>Voltar</Button>
      </HStack>
      { error &&  
        <Text fontSize="xl" color="red.600" p={4}>{ error }</Text>        
      }
    </Flex>
  )
}
