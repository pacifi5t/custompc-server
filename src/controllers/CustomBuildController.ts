import {
  CustomBuildModel,
  PartModel,
  RatingModel,
  SoftwareModel
} from 'models';
import { v4 as uuidv4 } from 'uuid';
import pdfkit from 'pdfkit';
import fs from 'fs';
import db from 'db';
import {
  sqlCalculateAvgRating,
  sqlAllCustomBuilds,
  sqlCustomBuildParts,
  sqlCustomBuildSoftware
} from 'sql';
import {
  BuildType,
  updateBuildsToPartsTable,
  updateSoftwareToPartsTable
} from 'utils';

class CustomBuildController {
  async create(
    authorId: string,
    name: string,
    price: number,
    warranty: number,
    status: string,
    parts: Array<string> | Array<Array<string>>,
    soft: Array<string>
  ) {
    let result;
    const buildId = uuidv4();

    try {
      result = await CustomBuildModel.create({
        id: buildId,
        authorId: authorId,
        name: name,
        price: price,
        averageRating: null,
        tasks: null,
        warranty: warranty,
        status: status
      });
    } catch (e) {
      console.error(e);
    } finally {
      const tempArr = new Array<string>();

      for (const elem of parts) {
        if (typeof elem === 'string') {
          tempArr.push(elem);
        } else {
          elem.forEach((val) => tempArr.push(val));
        }
      }
      updateBuildsToPartsTable(BuildType.Custom, buildId, tempArr);
      updateSoftwareToPartsTable(BuildType.Custom, buildId, soft);
    }

    return result;
  }

  async get(id: string) {
    return await CustomBuildModel.findByPk(id);
  }

  async getAll() {
    return (await db.query(sqlAllCustomBuilds))[0];
  }

  async getCustomBuildParts(id: string) {
    return (
      await db.query(sqlCustomBuildParts, {
        replacements: { id: id }
      })
    )[0];
  }

  async getCustomBuildSoftware(id: string) {
    return (
      await db.query(sqlCustomBuildSoftware, {
        replacements: { id: id }
      })
    )[0];
  }

  async updateAverageRating(id: string) {
    return (
      await db.query(sqlCalculateAvgRating, {
        replacements: { id: id }
      })
    )[0];
  }

  async delete(id: string) {
    return await CustomBuildModel.update(
      { status: 'removed' },
      { where: { id: id } }
    );
  }

  async createPdf(
    name: string,
    price: number,
    tasks: string,
    warranty: number,
    parts: Array<string> | Array<Array<string>>,
    soft: Array<string>
  ) {
    const printMap = new Map([
      ['cpu', 'CPU'],
      ['mb', 'Motherboard'],
      ['ram', 'RAM'],
      ['gpu', 'GPU'],
      ['psu', 'PSU'],
      ['storage', 'Storage drives'],
      ['cooling', 'Cooling'],
      ['case', 'Case'],
      ['os', 'Preinstalled OS'],
      ['office', 'Office suite']
    ]);
    const doc = new pdfkit();

    doc.pipe(fs.createWriteStream(`static/pdf/${name}.pdf`));
    doc
      .font('Times-Roman')
      .fontSize(24)
      .text(name, {
        align: 'center'
      })
      .moveDown();
    doc
      .fontSize(16)
      .text(
        //`Price: ${price} $\nTasks: ${tasks}\nWarrany: ${warranty} year(s)\n`
        `Price: ${price} $\nWarrany: ${warranty} year(s)\n`
      )
      .moveDown();

    const hList = new Array<string>();
    for (const elem of parts) {
      if (typeof elem === 'string') {
        const info = await PartModel.findByPk(elem);
        hList.push(
          `${printMap.get(info?.getDataValue('type'))} - ${info?.getDataValue(
            'name'
          )}`
        );
      } else {
        let str = `${printMap.get('storage')} - `;
        for (const val of elem) {
          const info = await PartModel.findByPk(val);
          str += `${info?.getDataValue('name')}, `;
        }
        hList.push(str.slice(0, str.length - 1));
      }
    }

    const sList = new Array<string>();
    for (const elem of soft) {
      const info = await SoftwareModel.findByPk(elem);
      sList.push(
        `${printMap.get(info?.getDataValue('type'))} - ${info?.getDataValue(
          'name'
        )}`
      );
    }
    doc
      .moveDown()
      .fontSize(20)
      .text('Hardware')
      .fontSize(16)
      .list(hList)
      .moveDown()
      .fontSize(20)
      .text('Software')
      .fontSize(16)
      .list(sList);
    doc.end();
  }

  async leaveRating(
    buildId: string,
    value: number,
    authorId: string,
    message: string
  ) {
    const existingRating = await RatingModel.findOne({
      where: {
        buildId: buildId,
        authorId: authorId
      }
    });

    if (existingRating !== null) {
      return await RatingModel.update(
        { value: value, message: message },
        {
          where: {
            buildId: buildId,
            authorId: authorId
          }
        }
      );
    }

    await RatingModel.create({
      id: uuidv4(),
      buildId: buildId,
      value: value,
      authorId: authorId,
      message: message
    });

    await db.query(sqlCalculateAvgRating, {
      replacements: { id: buildId }
    });
  }

  async calculateTasks(parts: Array<string> | Array<Array<string>>) {
    const types = ['cpu', 'ram', 'gpu'];
    let p = new Array<any>();
    
    for(const type of types) {
      const a = await PartModel.findAll({
        where: { type }
      });
      console.log(a);
      
      p = p.concat(a);
    }
    console.log(p);
    
  }
}

export default new CustomBuildController();
