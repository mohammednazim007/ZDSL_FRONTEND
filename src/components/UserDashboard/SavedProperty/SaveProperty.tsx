'use client'
import ProjectCard from '@/components/Projects/ProjectCard'
import Loder from '@/components/shared/Loder'
import { Project } from '@/interface/Projects'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { gql, useMutation, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'

const GET_WISHLIST = gql`
  query Query {
    getMyWishList {
      success
      message
      data {
        projects {
          _id
          bedroomNo
          bathroomNo
          flatSize
          projectTitle
          projectLocation {
            address
          }
          thumbnailImage
        }
      }
    }
  }
`

const DELETE_MY_WISHLIST = gql`
  mutation Mutation($input: UpdateWishListInput!) {
    updateMyWishList(input: $input) {
      success
      message
      data {
        user
        projects
      }
    }
  }
`

const SaveProperty = () => {
  const [bookmarkedProjects, setBookmarkedProjects] = useState<Project[]>([])
  const { loading, error, data } = useQuery(GET_WISHLIST)
  // Set up the mutation for updating the wishlist
  const [deleteMyWishList] = useMutation(DELETE_MY_WISHLIST)

  useEffect(() => {
    if (loading)
      toast.loading('Please wait, wishlist is fetching...', { id: 'wishlist' })

    if (data?.getMyWishList?.data?.projects) {
      setBookmarkedProjects(data?.getMyWishList?.data?.projects)
      toast.success(data?.getMyWishList?.message, { id: 'wishlist' })
    }

    if (error && error.message) toast.error(error.message, { id: 'wishlist' })
  }, [loading, data, error])

  const clearAllBookmarks = async () => {
    if (bookmarkedProjects.length === 0) {
      toast.error('No projects to clear', { id: 'clear-all' })
      return
    }

    toast.loading('Clearing all projects...', { id: 'clear-all' })

    const variables = {
      input: {
        projects: bookmarkedProjects.map((project) => ({
          id: project._id,
          needsDelete: true,
        })),
      },
    }
    const response = await deleteMyWishList({ variables })
    const isSuccess = response?.data?.updateMyWishList?.success

    if (!isSuccess)
      throw new Error(
        response?.data?.updateMyWishList?.message || 'Failed to clear projects'
      )

    if (isSuccess) {
      toast.success('All projects cleared successfully!', { id: 'clear-all' })
      setBookmarkedProjects([])
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">Saved Properties</h1>
        <button
          onClick={() => clearAllBookmarks()}
          className="text-sm py-2 px-4 flex gap-2 justify-center items-center border rounded-md"
        >
          <RiDeleteBin6Line />
          <p>Clear All</p>
        </button>
      </div>
      {loading ? (
        <div className="h-[80vh] pb-20 flex justify-center items-center">
          <Loder />
        </div>
      ) : bookmarkedProjects.length > 0 ? (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-1 pb-20">
          {bookmarkedProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              setReloadData={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="h-[80vh] pb-20 flex justify-center items-center">
          <h2 className="font-semibold text-center text-xl">
            No Projects Found
          </h2>
        </div>
      )}
    </div>
  )
}

export default SaveProperty
