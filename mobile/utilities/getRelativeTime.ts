import moment from 'moment';

export const getRelativeTime = (timestampString: string): string => {


  try {

    // Parse the timestamp string into a moment object
    const timestamp = moment(timestampString);

    // Check if the moment object is valid
    if (!timestamp.isValid()) {
      return 'Invalid timestamp';
    }

    // Get the relative time from now
    return timestamp.fromNow();
  }

  catch (err) {

    return 'Invalid timestamp';

  }
};