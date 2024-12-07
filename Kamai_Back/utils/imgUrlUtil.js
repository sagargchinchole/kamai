
const axios = require('axios');

exports.getImageUrl = (platform, link) => {
    const normalizedPlatform = platform.replace(/\s+/g, '').toLowerCase();
    switch (normalizedPlatform) {
        case 'flipkart':
            return flipkart(link);
        case 'reliancedigital':
            return relianceDigital(link);
        case 'croma':
            return croma(link);
        case 'jiomart':
            return jiomart(link);
        case 'mistore':
            return miStore(link);
        default:
            throw new Error(`Platform "${normalizedPlatform}" is not supported`);
    }
};

const flipkart = async (productLink) => {
        try {
          const parsedUrl = new URL(productLink);
          const pageUri = parsedUrl.pathname + parsedUrl.search;
          const apiUrl = `https://2.rome.api.flipkart.com/api/4/page/fetch`;
          const width = 312;
          const height = 312;
          const quality = 100;
          const payload = {
            'pageUri': pageUri,
            'pageContext': {
              'fetchSeoData': false
            }
          }
          const headers = {
            'Content-Type': 'application/json',
            'x-user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 FKUA/website/42/website/Desktop',
            'Cache-Control': 'no-cache'
          };
          const response = await axios.post(apiUrl, payload, { headers });
          const imgUrl = response.data.RESPONSE.pageData.pageContext.imageUrl;
          const updatedUrl = imgUrl
            .replace('{@width}', width)
            .replace('{@height}', height)
            .replace('{@quality}', quality);
          return updatedUrl
        } catch (error) {
          console.error('Error fetching data:', error);
        }     
};

const relianceDigital = async (productLink) => {
        try {
          const parsedUrl = new URL(productLink);
          const hostname = parsedUrl.origin;
          const productCode = productLink.split('/').at(5);
          const apiUrl = `https://www.reliancedigital.in/rildigitalws/v2/rrldigital/cms/pagedata?pageType=productPage&pageId=productPage&productCode=${productCode}`;
          console.log(apiUrl)
          const response = await axios.get(apiUrl);
          const media = response.data.data.productData.media[0];
          console.log(media)
          return hostname + media.productImageUrl;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
};

const croma = (productLink) => {
    
};

const jiomart = async (productLink) => {
    const headers = {
        'Pin': '800016'
      }
      
        try {
          const parsedUrl = new URL(productLink);
          const hostname = parsedUrl.origin;
          const productCode = productLink.split('/').at(6);
          const apiUrl = `https://www.jiomart.com/catalog/productdetails/get/${productCode}`;
          const response = await axios.get(apiUrl, { headers });
          const data = response.data.data;
          return hostname+data.image_url;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
};

const miStore = async (productLink) => {
        try {
          const parsedUrl = new URL(productLink);
          const pageUri = parsedUrl.pathname;
          console.log(pageUri.split('/'))
          const prodName = pageUri.split('/').at(3);
          const apiUrl = `https://in-go.buy.mi.com/in/misc/getgoodsinformation?tag=${prodName}`;
          console.log(apiUrl)
          const response = await axios.get(apiUrl);
          const imgUrl = response.data.data.goodsinformation[0].image;
          return imgUrl
        } catch (error) {
          console.error('Error fetching data:', error);
        }
};