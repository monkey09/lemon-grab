"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Datatable, Action } from "@/components/bytes"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type City = {
  id: number
  name: string
  packages: {
    id: number
    name: string
    price: string
  }[]
  created_at: string
  updated_at: string
}

export const Cities = () => {
  const cols: ColumnDef<City>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Created',
      accessorKey: 'created_at',
    },
    {
      header: 'Updated',
      accessorKey: 'updated_at',
    },
  ]

  const actions: Action<City>[] = [
    {
      title: 'update',
      id: 'update',
      fn: (item) => console.log(item)
    }
  ]

  const Packages = ({ packages }: {packages: City["packages"]}) => {
    return (
      <div className="max-w-[300px] border rounded">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>package</TableHead>
              <TableHead>price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.map(item => (
              <TableRow key={item.id}>  
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <Datatable 
      cols={cols} 
      actions={actions}
      keys={["governorates"]}
      selected={items => console.log(items)}
      url="governorate/admin/v1/governorates" 
      expand={(item) => <Packages packages={item.packages} />}
    />
  )
}