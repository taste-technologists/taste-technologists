import Profiles from '../components/Profiles';

function getVendorData(profile) {
  const data = Profiles.collection.findOne(profile);
  if (data.role === 'vendor') {

  }

}
