import { InferGetServerSidePropsType } from 'next'
import { format, parseISO } from 'date-fns'
import { Button } from "@chakra-ui/button"
import { VStack, Box, Text } from "@chakra-ui/layout"
import { useRouter } from "next/router"
import { Container } from "../components/Container"

type Data = { 
  date: string,
  value: string,
}

type Result = {
  props: {
    formattedDate: string,
    value: string
  }
}

const Last = ({ formattedDate, value } : InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  function handleBack(): void {
    router.back();
  }

  return (
    <Container height="100vh" w="full">
      <VStack height="100%" bg="gray.800" p={8} w="72" m={8} spacing={8} rounded="xl">
      <Box>
        <Text fontSize="3xl">{ formattedDate }</Text>
        <Text fontSize="4xl" textAlign="center">{ value }</Text>
      </Box>
      <Button size="lg" colorScheme="orange" w="full" onClick={() => handleBack()}>Voltar</Button>
      </VStack>
    </Container>
  )
}

export const getServerSideProps = async (): Promise<Result> => {
  const resp = await fetch('http://localhost:3000/api/stats/last')

  const data: Data = await resp.json()

  const { date, value } = data;
  const formattedDate = date ? format(parseISO(date), 'dd/MM/yyyy') : ''

  return {
    props: {
      formattedDate,
      value
    },
  }
}

export default Last