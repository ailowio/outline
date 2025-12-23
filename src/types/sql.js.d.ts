declare module 'sql.js' {
  export interface Database {
    run(sql: string, params?: any[]): void;
    exec(sql: string): void;
    prepare(sql: string): any;
    export(): Uint8Array;
  }

  export interface SqlJsStatic {
    Database: new (data?: Uint8Array) => Database;
  }

  interface InitSqlJsConfig {
    locateFile?: (file: string) => string;
  }

  function initSqlJs(config?: InitSqlJsConfig): Promise<SqlJsStatic>;
  
  export default initSqlJs;
}

