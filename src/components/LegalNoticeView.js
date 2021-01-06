import * as React from 'react';
import {ScrollView, SafeAreaView, Text, StyleSheet} from 'react-native';

export default class LegalNoticeView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      selectedIndex: 0,
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Servicevoorwaarden & Juridische Kennisgeving</Text>
        <Text style={styles.text}>
          Lees onderstaande tekst zorgvuldig na; ze beschrijft wat u van ons
          kunt verwachten als u onze services gebruikt en wat wij van u
          verwachten.
        </Text>
        <Text style={styles.subheader}>Niet-toegestane handelingen</Text>
        <Text style={styles.text}>
          Het is niet toegestaan enig deel van What the mask te herdistribueren,
          te verkopen of een nieuw product of service te maken op basis van
          What the mask.
        </Text>
        <Text style={styles.subheader}>Werkelijke omstandigheden; eigen risico</Text>
        <Text style={styles.text}>
          Indien u de kaartgegevens gebruikt, is het mogelijk dat de Werkelijke
          omstandighedenafwijken van de kaartresultaten en content. Het is uw
          eigen verantwoordelijkheid om de omstandigheden in te schatten en te
          beoordelen. U bent te allen tijde verantwoordelijk voor uw eigen gedrag
          en de gevolgen daarvan.
        </Text>
        <Text style={styles.subheader}>Standaard benamingen</Text>
        <Text style={styles.text}>
          De app gebruikt in zijn API standaard naamgeving, steunend op welgekende
          internationale standaarden voor benamingen en conventies.
        </Text>
        <Text style={styles.subheader}>Privacyverklaring</Text>
        <Text style={styles.text}>
          Deze privacyverklaring geeft weer hoe uw persoonsgegevens verzameld en
          verwerkt worden. U vindt hier ook alle rechten met betrekking tot uw
          gegevens. De privacyverklaring kan aangepast worden op basis van
          wetswijzigingen.
          {"\n"}
          {"\n"}
          Uw gegevens worden verwerkt conform de bepalingen van de Europese
          Algemene Verordening Gegevensbescherming (AVG) van 24 mei 2016
          (beter bekend als General Data Protection Regulation of ‘GDPR’).
          {"\n"}
          {"\n"}
          What the mask gaat niet om Personally Identifiable Information
          (PII) van de app gebruikers is ontworpen onder het concept van
          'Privacy by Design'. De locatiegegevens worden op onze servers opgeslagen
          maar kunnen enkel teruggebracht worden tot een uniek nummer, dat
          geen info bevat over uw persoonsgegevens.
          {"\n"}
          {"\n"}
          Uw gegevens zullen nooit gebruikt worden voor commerciele doeleinden.
        </Text>
        <Text style={styles.subheader}>Apparaattoestemmingen</Text>
        <Text style={styles.text}>
          Voor een goede werking vraagt de app toestemming tot enkele apparaatgegevens.
          Nadat toestemming gegeven is, kan u deze op elk moment weer intrekken
          via de apparaatinstellingen. Let wel op dat het intrekken van toestemmingen
          het correct functioneren van deze app kan beinvloeden.
          {"\n"}
          {"\n"}
          De toestemmingen die gevraagd worden zijn:
          {"\n"}
          {"\n"}
          1. LOCATIEGEGEVENS
          {"\n"}
          De app kan locatiegegevens verzamelen en gebruiken om diensten te
          verlenen op basis van de locatie van uw apparaat. Dit gebeurt, mits
          toestemming, doorlopend.
          De app vraagt om uw locatievoorzieningen te activeren en toestemming
          voor het gebruik ervan te verlenen. Daarnaast wordt er ook gevraagd
          toestemming te geven om de locatiegegevens op te vragen wanneer de app
          niet in gebruik is.
          {"\n"}
          {"\n"}
          2. NOTIFICATIES
          {"\n"}
          De app kan notificaties of zogenaamde push berichten sturen.
        </Text>
        <Text style={styles.subheader}>Apparaattoestemmingen</Text>
        <Text style={styles.text}>
          Deze app wordt gedownload via een App Store van derden. Lees de
          relevante privacyverklaringen van de desbetreffende aanbieders na.
          What the mask is niet verantwoordelijk voor de verwerking van
          persoonsgegevens door derden (bvb. externe websites, apps).
        </Text>
        <Text style={styles.subheader}>Contactgegevens</Text>
        <Text style={styles.text}>
          Indien u vragen heeft over de verwerking van uw persoonsgegevens,
          een correctie wilt aangeven of een vraag heeft over deze
          Servicevoorwaarden, Juridische informatie en privacyverklaring, kan
          u ons contacteren via
          ...
        </Text>
      </ScrollView>
    </SafeAreaView>
    );
  }
}

// TODOs
// - info over statistieken
// - contactgegevens aanvullen
// - MIT/apache packages

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 5,
  },
  item: {
    marginHorizontal: 20,
  },
  'item:last-child': {
    backgroundColor: '#444',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 15,
    marginHorizontal: 22,
    marginBottom: 5,
  },
  subheader: {
    fontSize: 16,
    marginTop: 5,
    marginHorizontal: 22,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    marginHorizontal: 2,
  },
  text: {
    marginBottom: 7,
    marginHorizontal: 22,
    color: 'grey',
    textAlign: 'justify',
  },
  box: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 13,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderTopWidth: 0.5,
  },
  emptyBox: {
    borderColor: 'grey',
    borderTopWidth: 0.5,
  },
});
