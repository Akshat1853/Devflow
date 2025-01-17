
import { SearchParamsProps } from '@/types'
import React from 'react'
import AnswerCard from '../cards/AnswerCard';

import Pagination from './Pagination';
import { getUserAnswers } from '@/lib/actions/user.action';

interface Props extends SearchParamsProps{
    userId:string;
    clerkId?:string | null ;



}
const AnswersTab =async ({searchParams,userId,clerkId}:Props) => {
    const result=await getUserAnswers({
        userId,
        page:searchParams.page ? +searchParams.page : 1,

    })
    return (
        <div>
            {result.answers.map((item)=>(
                <AnswerCard
                key={item._id}
                clerkId={clerkId}
                _id={item._id}
                question={item.question}
                author={item.author}
                upvotes={item.upvotes.length}
                createdAt={item.createdAt}
                />
            ))}
            <div className='mt-10'>
                <Pagination
                pageNumber={searchParams?.page ? +searchParams.page :1}
                isNext={result.isNextAnswer}
                />
            </div>

        </div>
    )
}

export default AnswersTab