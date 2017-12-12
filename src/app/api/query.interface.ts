export interface QueryInterface {

  where?: any; //string
  max_results?: number; //number
  page?: number; //number
  sort?: any; //string or array? [{key: 1}] or ["-key", "key2", ...]
  aggregate?: any; //string
  projection?: any;
}
