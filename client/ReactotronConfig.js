import Reactotron, {networking} from 'reactotron-react-native';

Reactotron.configure()
  .use(networking()) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
