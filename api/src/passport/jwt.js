const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { jwtSecret: secretOrKey } = require('@/config');

/*
	fromHeader(header_name) создает новый экстрактор, который ищет JWT в заданном заголовке http
	fromBodyField(field_name)создает новый экстрактор, который ищет JWT в заданном поле тела. Для использования этого метода необходимо настроить анализатор тела.
	fromUrlQueryParameter(param_name) создает новый экстрактор, который ищет JWT в заданном параметре запроса URL.
	fromAuthHeaderWithScheme(auth_scheme) создает новый экстрактор, который ищет JWT в заголовке авторизации, ожидая, что схема будет соответствовать auth_scheme.
	fromAuthHeaderAsBearerToken() создает новый экстрактор, который ищет JWT в заголовке авторизации со схемой «носитель»
	fromExtractors([array of extractor functions]) создает новый экстрактор, используя предоставленный массив экстракторов. Каждый экстрактор выполняется по порядку, пока не будет возвращен токен.
*/

module.exports = new JwtStrategy(
  {
    // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: (req) => req?.cookies?.jwt || null,
    secretOrKey,
  },
  async function (payload, done) {
    done(null, payload);
  }
);
