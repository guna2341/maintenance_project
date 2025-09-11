import { Card, CardBody } from '@heroui/card';
import { StateCard } from './stateCard';
import { BlockHeader } from './blockHeader';

export const BlockCard = (
  {
    block,
    states = [],
    loading = false,
    handleClick
  }
) => {
  const keys = ["active", "inactive", "maintenance"];
  return (
    <Card
      radius='sm'
      shadow='sm'
      className='min-w-[250px] sm:min-w-[428px] border-l-0 p-0 cursor-pointer bg-custom-100 text-custom-300'
    >
      <div className='border-l-3 rounded-[8px] border-l-custom-200 border border-black/15' onClick={handleClick}
>
        <div className='px-3.5 py-2'>
          <BlockHeader
            loading={loading}
            block={block?.toUpperCase()}
            states={states}
          />
        </div>
        <CardBody
        >
          <div
            className='flex items-center justify-between gap-4'
          >
            {keys.map((item, index) => {
              return (
                <StateCard states={states} key={index} item={item} loading={loading} />
              )
            })}
          </div>
        </CardBody>
      </div>
    </Card>
  )
}
