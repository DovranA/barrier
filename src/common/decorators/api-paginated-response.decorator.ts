import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiQuery({ name: 'perPage', type: 'number', required: false }),
    ApiQuery({ name: 'page', type: 'number', required: false }),
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
            required: ['data'],
          },
          {
            properties: {
              meta: {
                type: 'object',
                properties: {
                  total: { type: 'number' },
                  page: { type: 'number' },
                  lastPage: { type: 'number' },
                  perPage: { type: 'number' },
                  currentPage: { type: 'number' },
                  prev: { type: 'number' },
                  next: { type: 'number' },
                },
                required: [
                  'total',
                  'page',
                  'lastPage',
                  'perPage',
                  'currentPage',
                  'prev',
                  'next',
                ],
              },
            },
            required: ['meta'],
          },
        ],
      },
    }),
  );
};