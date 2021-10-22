import { EntityRepository, Repository } from 'typeorm';
import { ImageEntity } from '../entities';
import { FileService } from '../shared/services/file.service';
import { config } from '../config/app.config';
import { MulterFile } from '../utils/shared.types';
import { HttpException, HttpStatus } from '@nestjs/common';
import sharp from 'sharp';

@EntityRepository(ImageEntity)
export class ImageRepository extends Repository<ImageEntity> {
  private fileService = new FileService();

  async deleteOldImg(oldImage: ImageEntity): Promise<void> {
    this.fileService.deleteFile(oldImage.path);
    await oldImage.remove();
  }

  async updateImg(
    oldImg?: ImageEntity,
    newImgId?: string,
  ): Promise<ImageEntity> | null {
    if (newImgId) {
      const newImg = await this.findOne(newImgId);
      if (!newImg) {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }

      if (oldImg && oldImg.id !== newImg.id) {
        await this.deleteOldImg(oldImg);
      }

      return newImg;
    }

    if (!newImgId) {
      if (oldImg) {
        await this.deleteOldImg(oldImg);
      }

      return null;
    }
  }

  async upload(
    file: MulterFile,
    folderName: string,
    validExtensions: string[],
    resizeOptions?: sharp.ResizeOptions,
  ): Promise<ImageEntity> {
    if (!this.fileService.isValidFileExtension(file, validExtensions)) {
      throw new Error(`Invalid image file extension.`);
    }

    const [imageName, imagePath] = await this.fileService.processImageUpload(
      file,
      `${config.UPLOAD_IMAGES_DIR}/${folderName}`,
      resizeOptions,
    );
    const image = this.create();
    image.name = imageName;
    image.path = imagePath;
    return await image.save();
  }
}
