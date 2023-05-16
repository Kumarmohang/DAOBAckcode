/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */

import _ from 'lodash';


const selectorMap = new Map();
const getBackgroundDetails = dataJson => {
  return dataJson.background.map(data => data.background).join('\n');
};

const getTimestampDetails = dataJson => {
  return dataJson.timeline
    .map(
      (timelinedata: { title: any; requiredFunding: any; status: any; startDate: any; endDate: any }) =>
        `Tittle : ${timelinedata.title}
           Required Funding : ${timelinedata.requiredFunding}
           Status : ${timelinedata.status}
           startDate : ${new Date(timelinedata.startDate).toLocaleDateString('en-GB')}
           endDate : ${new Date(timelinedata.endDate).toLocaleDateString('en-GB')}`,
    )
    .join('\n');
};
selectorMap.set('background ', getBackgroundDetails);
selectorMap.set('timeline', getTimestampDetails);

export const replaceSelectorToOriginal = (stringWithSelector: string, dataJson: Object): string => {
  return stringWithSelector.replace(/{{(.*?)}}/g, function (_string, match) {
    if (!selectorMap.has(match)) {
      return _.get(dataJson, match, '-');
    }
    return selectorMap.get(match)(dataJson);
  });
};
