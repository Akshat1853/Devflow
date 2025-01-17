"use client"
import React, { useRef, useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { AnswerSchema } from '@/lib/validation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tinymce/tinymce-react'
import { useTheme } from '@/context/ThemeProvider'
import { Button } from '../ui/button'
import Image from 'next/image'
import { createAnswer } from '@/lib/actions/answer.action'
import { usePathname } from 'next/navigation'
interface Props{
    question:string;
    questionId:string;
    authorId:string
}
const Answer = ({question,questionId,authorId}:Props) => {
    const pathname=usePathname()
    const [isSubmitting,setIsSubmitting]=useState(false)
    const [isSubmittingAi,setIsSubmittingAi]=useState(false)
    const {mode }=useTheme()
    const editorRef=useRef(null)
    const form =useForm<z.infer<typeof AnswerSchema>>({
        resolver:zodResolver(AnswerSchema),
        defaultValues:{
            answer:''
        }
    })

   
    const handleCreateAnswer=async(values:z.infer<typeof AnswerSchema>)=>{
        setIsSubmitting(true)
        try {
            await createAnswer({
                content:values.answer,
                author: JSON.parse(authorId),
                question:JSON.parse(questionId),
                path:pathname
            })

            form.reset();

            if(editorRef.current){
                const editor=editorRef.current as any;
                editor.setContent('')
            }
        } catch (error) {
            console.log(error)
            
        }finally{
            setIsSubmitting(false)
        
        }
    }
  return (
    <div >
        <div className="flex flex-full justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
            <h4 className='paragraph-semibold text-dark400_light800'>
                Write Your answer here
            </h4>

            <Button
            onClick={()=>{}}
            className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500 ">
                <Image
                src="/assets/icons/stars.svg"
                alt="star"
                width={12}
                height={12}
                className="object-contain"
                />
                Generate an Ai Answer
            </Button>
        </div>
   
    <Form {...form}>
        <form
        className='mt-6 flex w-full flex-col gap-10'
        onSubmit={form.handleSubmit(handleCreateAnswer)}
        >   

<FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                   
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                       
                       
                        
                        "autolink",
                        
                        
                        "codesample",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        
                        "fullscreen",
                     
                        "insertdatetime",
                        "media",
                        "table",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | bold italic forecolor | codesample | " +
                        "alignleft aligncenter alignright alignjustify | " +
                        "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",

                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                        skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                        content_css: mode=== 'dark' ? 'dark' : 'light',
                    }}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
            type='submit'
            className="primary-gradient w-fit text-white"
            disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...': 'Submit'}
            </Button>

          </div>

        </form>
    </Form>
    </div>
  )
}

export default Answer