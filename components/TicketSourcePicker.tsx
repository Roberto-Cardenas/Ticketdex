import { View, StyleSheet, Platform } from 'react-native';

import TicketImagePicker from './TicketImagePicker';
import TicketFilePicker from './TicketFilePicker';
import TicketSourceRadioButton from './TicketSourceRadioButton';
import TicketExternalLink from './TicketExternalLink';
import { FileData } from '@/imports/types';
import { externalTicketLinks } from '@/constants/ExternalTicketLinks';

type Props = {
  fileData: FileData;
  setFileData: (fileData: FileData) => void;
  selected: string;
  setSelected: (selected: string) => void;
};

export default function TicketSourcePicker({ fileData, setFileData, selected, setSelected }: Props) {
  const generateExternalLinkSelectors = () => {
    const externalLinkArray = [];
    const currentPlatform = Platform.OS;

    for (const key in externalTicketLinks) {
      const link = key as keyof typeof externalTicketLinks;
      const linkPlatform = externalTicketLinks[link].platform;

      if (linkPlatform === 'all' || linkPlatform === currentPlatform) {
        externalLinkArray.push((
          <TicketSourceRadioButton key={link} selected={selected} setSelected={setSelected} value={link} >
            <TicketExternalLink selected={selected} value={link} label={externalTicketLinks[link].label} />
          </TicketSourceRadioButton>
        ));
      }
    }

    return externalLinkArray;
  };
  
  return (
    <View style={{
      gap: 8,
      marginBottom: 8
    }}>
      {/* PDF Selector */}
      <TicketSourceRadioButton selected={selected} setSelected={setSelected} value='file' >
        <TicketFilePicker enabled={ selected === 'file' } fileData={fileData} setFileData={setFileData} />
      </TicketSourceRadioButton>
      {/* Screenshot selector */}
      <TicketSourceRadioButton selected={selected} setSelected={setSelected} value='image' >
        <TicketImagePicker enabled={ selected === 'image' } fileData={fileData} setFileData={setFileData} />
      </TicketSourceRadioButton>
      {/* External links */}
      {generateExternalLinkSelectors()}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  }
});
