import db from 'db';
import jwt from 'jsonwebtoken';

enum BuildType {
  Custom,
  Company
}

function generateJwt(id: string, role: string) {
  const secret = process.env.JWT_KEY;
  if (!secret) {
    throw new Error('Cannot generate JWT!');
  }
  return jwt.sign({ id, role }, secret, { expiresIn: '28d' });
}

//FIXME: those will cause fail while updating builds
function updateBuildsToPartsTable(
  type: BuildType,
  buildId: string,
  partIds: Array<string>
) {
  let tableName = 'custom_builds_parts';
  if(type === BuildType.Company) {
    tableName = 'company_builds_parts';
  }

  let sql = `INSERT INTO ${tableName} VALUES`;
  for(const id of partIds) {
    sql = sql + ` ('${buildId}', '${id}'), `
  }

  db.query(sql.slice(0, sql.length - 2));
}

function updateSoftwareToPartsTable(
  type: BuildType,
  buildId: string,
  softwareIds: Array<string>
) {
  let tableName = 'custom_builds_software';
  if(type === BuildType.Company) {
    tableName = 'company_builds_software';
  }

  let sql = `INSERT INTO ${tableName} VALUES`;
  for(const id of softwareIds) {
    sql = sql + ` ('${buildId}', '${id}'), `
  }

  db.query(sql.slice(0, sql.length - 2));
}

export { BuildType, generateJwt, updateBuildsToPartsTable, updateSoftwareToPartsTable };
