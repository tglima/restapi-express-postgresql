import ReturnDTO from '../dtos/ReturnDTO';
import dbUtil from '../utils/db.util';

/**
 * Query básica para realizar consulta na tabela products
 */
const sqlQueryProducts =
  'select ' +
  'id_product as idProduct,' +
  'nm_product as nmProduct,' +
  'vl_month_price as vlMonthPrice,' +
  'nm_video_quality as nmVideoQuality,' +
  'nm_resolution as nmResolution,' +
  'qt_simultaneous_screens as qtSimultaneousScreens ' +
  'from products ';

class ProductRepository {
  /**
   *
   * Busca na base de dados um produto que corresponda ao id informado
   *
   * @param {Number} idProduct
   * @returns {ReturnDTO}
   */
  async findProductById(idProduct) {
    const returnDTO = new ReturnDTO();

    try {
      const db = await dbUtil.getConnection();

      let sql = sqlQueryProducts;
      sql += 'where is_active = $1 and id_product = $2 ';
      sql += 'order by vl_month_price desc ';
      sql += 'limit 1';

      const values = [true, idProduct];
      const resDB = await db.query(sql, values);

      db.release();

      if (!resDB.rows || resDB.rows.length < 1) {
        returnDTO.wasSuccess = false;
        returnDTO.jsonBody = undefined;
      } else {
        const products = resDB.rows[0];
        if (products) {
          returnDTO.wasSuccess = true;
          returnDTO.jsonBody = products;
        }
      }
    } catch (error) {
      returnDTO.jsonBody = undefined;
      returnDTO.wasSuccess = false;
      returnDTO.error = error;
    }
    return returnDTO;
  }

  /**
   *
   * Busca na base de dados todos os produtos disponíveis para venda
   *
   * @returns {ReturnDTO}
   */
  async findAllProducts() {
    const returnDTO = new ReturnDTO();

    try {
      const db = await dbUtil.getConnection();

      let sql = sqlQueryProducts;
      sql += 'where is_active = $1 ';
      sql += 'order by vl_month_price desc ';
      sql += 'limit 10;';

      const values = [true];

      const resDB = await db.query(sql, values);

      db.release();

      if (!resDB.rows || resDB.rows.length < 1) {
        returnDTO.wasSuccess = false;
        returnDTO.jsonBody = undefined;
      } else {
        const products = resDB.rows;
        if (products) {
          returnDTO.wasSuccess = true;
          returnDTO.jsonBody = { products };
        }
      }
    } catch (error) {
      returnDTO.jsonBody = undefined;
      returnDTO.wasSuccess = false;
      returnDTO.error = error;
    }

    return returnDTO;
  }
}

export default new ProductRepository();
