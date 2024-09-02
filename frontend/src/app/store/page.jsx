import { Card, CardHeader, CardBody, Heading, Text, Stack, StackDivider, Box, Image } from '@chakra-ui/react';

export default function StorePage({ params }) {
  const { id } = params;

  // ダミーデータを定義
  const dummyRestaurant = {
    id: id,
    name: 'Sample Restaurant',
    description: 'This is a sample description for the restaurant.',
    address: '123 Sample Street, Sample City',
    phone: '123-456-7890',
    hours: '9:00 AM - 9:00 PM',
    image: 'https://via.placeholder.com/600',
    genre: "中華",
    priceRange: "1000~2000円",
  };

  return (
    <Card align="center" maxW={{ base: '90%', sm: '80%', md: '60%', lg: '50%' }} m="auto" p="4" width={{ base: '80%', md: '60%', lg: '40%' }} borderWidth="100px" borderRadius="sm" overflow="hidden" boxShadow="sm">
      <CardHeader>
        <Heading size='md'>{dummyRestaurant.name}</Heading>
      
        </CardHeader>
        <Image
           src={dummyRestaurant.image}
           alt={dummyRestaurant.name}
           borderRadius='md'
           width="100%"         // カードの幅に合わせる
            height="auto"   
            maxHeight="300px"       // 画像の最大高さを300pxに設定    // アスペクト比を保ちながら高さを自動調整
            objectFit="cover"     // カード内に収まるように調整
        />
        <CardBody>
      
        <Stack divider={<StackDivider />} spacing='4' mt="4">
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              住所
            </Heading>
            <Text pt='2' fontSize='sm'>
              {dummyRestaurant.address}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              電話番号
            </Heading>
            <Text pt='2' fontSize='sm'>
              {dummyRestaurant.phone}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              営業時間
            </Heading>
            <Text pt='2' fontSize='sm'>
              {dummyRestaurant.hours}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              ジャンル
            </Heading>
            <Text pt='2' fontSize='sm'>
              {dummyRestaurant.genre}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              価格帯
            </Heading>
            <Text pt='2' fontSize='sm'>
              {dummyRestaurant.priceRange}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
