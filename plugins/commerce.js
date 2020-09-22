import CommerceSDK from "@chec/commerce.js";

const commercejs = new CommerceSDK(process.env.NUXT_ENV_CHEC_PUBLIC_API_KEY);

export default (_, inject) => {
  inject("commerce", commercejs);
};
