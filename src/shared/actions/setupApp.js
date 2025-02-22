// External
import Request from 'request';

// Internal
import * as TYPE from 'consts/actionTypes';
import { openModal } from 'actions/overlays';
import EncryptionWarningModal from 'components/EncryptionWarningModal';

export const SetMarketAveData = () => dispatch => {
  Request(
    {
      url: 'https://whispering-lake-14690.herokuapp.com/displaydata',
      // 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=NXS,BTC&tsyms=BTC,USD,EUR,AUD,BRL,GBP,CAD,CLP,CNY,CZK,HKD,ILS,JPY,KRW,MYR,MXN,NZD,PKR,RUB,SAR,SGD,ZAR,CHF,TWD,AED',
      json: true,
    },
    (error, response, body) => {
      if (response.statusCode === 200) {
        // fetch('https://min-api.cryptocompare.com/stats/rate/limit')
        //   .then(response => response.json())
        //   .then(data => {

        //   });

        let rawBTC = Object.values(body.RAW.BTC).map(ele => {
          return {
            changePct24Hr: ele.CHANGEPCT24HOUR,
            marketCap: ele.MKTCAP,
            price: ele.PRICE,
            name: ele.TOSYMBOL,
          };
        });
        let rawNXS = Object.values(body.RAW.NXS).map(ele => {
          return {
            changePct24Hr: ele.CHANGEPCT24HOUR,
            marketCap: ele.MKTCAP,
            price: ele.PRICE,
            name: ele.TOSYMBOL,
          };
        });
        let displayBTC = Object.values(body.RAW.BTC).map(ele => {
          let curCode = ele.TOSYMBOL;
          let displayEle = body.DISPLAY.NXS[curCode];
          return {
            changePct24Hr: displayEle.CHANGEPCT24HOUR,
            marketCap: displayEle.MKTCAP,
            price: displayEle.PRICE,
            name: curCode,
            symbol: displayEle.TOSYMBOL,
          };
        });
        let displayNXS = Object.values(body.RAW.NXS).map(ele => {
          let curCode = ele.TOSYMBOL;
          let displayEle = body.DISPLAY.NXS[curCode];
          return {
            changePct24Hr: displayEle.CHANGEPCT24HOUR,
            marketCap: displayEle.MKTCAP,
            price: displayEle.PRICE,
            name: curCode,
            symbol: displayEle.TOSYMBOL,
          };
        });

        dispatch({
          type: TYPE.SET_MKT_AVE_DATA,
          payload: {
            rawBTC: rawBTC,
            rawNXS: rawNXS,
            displayBTC: displayBTC,
            displayNXS: displayNXS,
          },
        });
      }
    }
  );
};

export const BlockDate = stamp => ({ type: TYPE.BLOCK_DATE, payload: stamp });

export const AddRPCCall = returnCall => ({
  type: TYPE.ADD_RPC_CALL,
  payload: returnCall,
});

export const showEncryptionWarningModal = () => (dispatch, getState) => {
  const state = getState();
  if (
    !state.common.encryptionModalShown &&
    !state.settings.encryptionWarningDisabled &&
    state.settings.acceptedAgreement
  ) {
    dispatch(openModal(EncryptionWarningModal));
    dispatch({
      type: TYPE.SHOW_ENCRYPTION_MODAL,
    });
  }
};

export const printCoreOutput = data => ({
  type: TYPE.PRINT_CORE_OUTPUT,
  payload: data,
});
