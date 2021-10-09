import { getConnection, Repository } from "typeorm";

export default function getRepository<T>(type: any): Repository<T> {
  const conn = getConnection();
  const repository = conn.getRepository<T>(type);
  return repository;
}
