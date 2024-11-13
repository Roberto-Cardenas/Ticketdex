import * as FileSystem from 'expo-file-system';

const ticketDirectory = FileSystem.documentDirectory + 'rollodexTickets/';

const ensureDirectoryExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(ticketDirectory);

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(ticketDirectory, { intermediates: true });
  }
};

const printFileNamesInFolder = async () => {
  await ensureDirectoryExists();

  const files = await FileSystem.readDirectoryAsync(ticketDirectory);
  console.log(files);
}

export async function saveTicket(name: string, uri: string) {
  await ensureDirectoryExists();
  const fileName = new Date().getTime() + name;
  const destination = ticketDirectory + fileName;
  await FileSystem.copyAsync({ from: uri, to: destination });

  return destination;
}

export async function deleteTicket(uri: string) {
  if (await ticketExists(uri)) {
    await FileSystem.deleteAsync(uri);
    // printFileNamesInFolder(); For debugging
  }
}

export async function ticketExists(uri: string) {
  const file = await FileSystem.getInfoAsync(uri);

  return file.exists;
}
