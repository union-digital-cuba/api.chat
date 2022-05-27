const GetPagination = (page, size) => {
  const limit = size ? +size : 3
  const offset = page ? page * limit : 0

  return { limit, offset }
}

const GetPagingData = (data, page, limit) => {
  const { count: totalItems } = data
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(totalItems / limit)

  return { totalItems, totalPages, currentPage }
}

export { GetPagination, GetPagingData }
