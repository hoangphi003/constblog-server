import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    try {
      this.postRepository.save(createPostDto);
    } catch (error) {
      throw new HttpException(
        {
          error: error.message || 'Create Fail',
        },
        HttpStatus.BAD_GATEWAY,
        {
          cause: error,
        },
      );
    }
  }

  findAll(): Promise<Post[]> {
    try {
      return this.postRepository.find();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: 'Find All Fail',
        },
        HttpStatus.BAD_GATEWAY,
        { cause: error },
      );
    }
  }

  async checkUserIsExist(id: number) {
    const user = await this.postRepository.findOne({ where: { id: id } });
    return user;
  }

  async findOne(id: number) {
    try {
      return this.postRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: `find Fail`,
        },
        HttpStatus.BAD_GATEWAY,
        { cause: error },
      );
    }
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    try {
      return this.postRepository.update(id, updatePostDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: `update Fail`,
        },
        HttpStatus.BAD_GATEWAY,
        { cause: error },
      );
    }
  }

  async remove(id: number) {
    try {
      const isExist = await this.checkUserIsExist(id);
      if (isExist == null) return;
      return this.postRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: `delete Fail`,
        },
        HttpStatus.BAD_GATEWAY,
        { cause: error },
      );
    }
  }
}
