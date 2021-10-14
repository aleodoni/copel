import { useRouter } from 'next/router'
import { VStack, Button } from '@chakra-ui/react'
import { Container } from '../components/Container'

const Index = () => {
  const router = useRouter()

  function handleEfetuarLeitura(): void {
    router.push('/register')
  }

  function handleUltimaLeitura(): void {
    router.push('/last')
  }

  return (
    <Container height="100vh" w="full">
      <VStack height="100%" bg="gray.800" p={8} w="72" m={8} spacing={8} rounded="xl">
        <Button size="lg" colorScheme="orange" w="full" onClick={() => handleEfetuarLeitura()}>Efetuar leitura</Button>
        <Button size="lg" colorScheme="orange" w="full" onClick={() => handleUltimaLeitura()}>Última leitura</Button>
      </VStack>
    </Container>
  )
}

export default Index
