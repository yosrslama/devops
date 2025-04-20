const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'salle-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'salle-group' });

async function consumeMessages() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'reservation-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Message reçu dans salle-service : ${message.value.toString()}`);
      // Implémenter la logique pour traiter le message
    },
  });
}

consumeMessages().catch(console.error);
