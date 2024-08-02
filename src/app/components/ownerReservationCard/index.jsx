import { Button, Card, CardBody, Stack, Text, Link } from '@chakra-ui/react';

const OwnerReservationCard = ({ reservation }) => {
    console.log('OwnerReservationCard -- reservation:', reservation);
    return (
        <Card>
            <CardBody>
                <Stack direction="row" justifyContent="space-between">
                    <Stack spacing={0}>
                        <Text className="text-h2-s font-bold ">{reservation.date}</Text>
                        <Text className="text-body-l ">{reservation.time}:00 - {parseInt(reservation.time, 10) + 1}:00</Text>
                    </Stack>
                    <Link href={`/chat/${reservation.userId}`}>
                        <Button colorScheme="teal" marginRight={5}>Chat with user</Button>
                    </Link>
                </Stack>
            </CardBody>
        </Card>
    );

}

export default OwnerReservationCard;