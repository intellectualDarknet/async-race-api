const app = express();
const cors = require('cors')

app.enable('trust proxy')

app.use(cors())

app.use('/api/v1/tours', dbrouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});