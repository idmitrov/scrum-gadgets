/**
 * Wrap db enigne (By default mongoose) and provide public methods
 * for using it
 * @name Database
 * @desc Wrap mongoose and provide public methods for using it
 * @param {Object|Function} engnie
 */
class Database {
  constructor(engine) {
    this.engine = engine;
  }

  /**
   * Connect to the database instance by provided parameters
   * @name connect
   * @desc Call engine.connect method.
   * if success store the parameters and returns the connection/context
   * other wise returns error
   * @param {String} host
   * @param {String|Number} port
   * @param {String} name
   * @param {Object} options
   * @returns {Promise} connection
   */
  connect(host, port, name, options = null) {
    this.connectionString = `mongodb://${host}:${port}/${name}`;

    return this.engine.connect(this.connectionString, options)
      .then((connection) => {
        this.host = host;
        this.port = port;
        this.name = name;
        this.options = options;
        this.connection = connection;

        return connection;
      });
  }
}

module.exports = Database;
