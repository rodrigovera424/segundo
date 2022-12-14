import fs from "fs";

class FileSystemContainer {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async readFile() {
    try {
      return JSON.parse(
        await fs.promises.readFile(`DB/${this.fileName}.json`, "utf-8")
      );
    } catch (error) {
      throw new Error(`Reading error: ${error}`);
    }
  }

  async writeFile(data) {
    try {
      fs.promises.writeFile(
        `DB/${this.fileName}.json`,
        JSON.stringify(data),
        "utf-8"
      );
    } catch (error) {
      throw new Error(`Writing error: ${error}`);
    }
  }

  async getAll() {
    try {
      const allItems = await this.readFile();
      return allItems;
    } catch (error) {
      await this.writeFile([]);
      const allItems = await this.readFile();
      return allItems;
    }
  }

  async getById(id) {
    try {
      const allItems = await this.readFile();
      const itemFound = allItems.find((item) => item.id === Number(id));
      return itemFound;
    } catch (error) {
      throw new Error(`Error getting item: ${error}`);
    }
  }

  async addItem(object) {
    try {
      const allItems = await this.readFile();
      allItems.push(object);
      await this.writeFile(allItems);
    } catch (error) {
      throw new Error(`Error adding item: ${error}`);
    }
  }

  async editById(object) {
    try {
      let allItems = await this.readFile();
      allItems = allItems.map((item) =>
        item.id !== object.id ? item : object
      );
      await this.writeFile(allItems);
    } catch (error) {
      throw new Error(`Error editing item: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const allItems = await this.readFile();
      const filteredItemList = allItems.filter(
        (item) => item.id !== Number(id)
      );
      if (JSON.stringify(allItems) === JSON.stringify(filteredItemList)) {
        return false;
      } else {
        await this.writeFile(filteredItemList);
        return true;
      }
    } catch (error) {
      throw new Error(`Error deleting item: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await this.writeFile([]);
    } catch (error) {
      throw new Error(`Error deleting all: ${error}`);
    }
  }

  async addItemInto(containerId, object) {
    try {
      let allItems = await this.readFile();
      let itemFound = allItems.find((item) => item.id === Number(containerId));
      itemFound.productos.push(object);
      allItems = allItems.map((item) =>
        item.id !== itemFound.id ? item : itemFound
      );
      await this.writeFile(allItems);
    } catch (error) {
      throw new Error(`Error adding item into: ${error}`);
    }
  }

  async removeItemFrom(containerId, objectId) {
    try {
      let allItems = await this.readFile();
      let itemFound = allItems.find((item) => item.id === Number(containerId));
      itemFound.productos = itemFound.productos.filter(
        (item) => item.id !== Number(objectId)
      );
      allItems = allItems.map((item) =>
        item.id !== itemFound.id ? item : itemFound
      );
      await this.writeFile(allItems);
    } catch (error) {
      throw new Error(`Error deleting item from: ${error}`);
    }
  }

  async emptyContainer(containerId) {
    try {
      let allItems = await this.readFile();
      let itemFound = allItems.find((item) => item.id === Number(containerId));
      itemFound.productos = [];
      allItems = allItems.map((item) =>
        item.id !== itemFound.id ? item : itemFound
      );
      await this.writeFile(allItems);
    } catch (error) {
      throw new Error(`Error emptying container: ${error}`);
    }
  }
}

export default FileSystemContainer;
