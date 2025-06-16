import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from 'uuid';

interface basicInfo {
  id: string;
  productName: string;
  productSKU: string;
  productType: string;
  category: string;
  brand: string;
  description: string;
  shortDescription: string;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
  operation: number;
}

interface Props {
  BasicInfo: basicInfo;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (field: keyof basicInfo, value: string) => void;
}

const ProductInfo: React.FC<Props> = ({ BasicInfo, handleChange, handleSelectChange }) => {    
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-4 space-y-4 text-left">
                <div className="w-100">
                    <Label 
                        htmlFor="productName" 
                        className="font-bold text-left">
                        Product Name
                    </Label>
                    <Input 
                        name="productName" 
                        type="text" 
                        className="h-9 text-sm" 
                        placeholder="Enter product name" 
                        value={BasicInfo.productName}
                        onChange={handleChange}
                        maxLength={200} />
                </div>
                <div className="w-100">
                    <Label 
                        htmlFor="productSKU" 
                        className="font-bold text-left">
                        Product SKU
                    </Label>
                    <Input 
                    id="productSKU"
                        name="productSKU" 
                        value={BasicInfo.productSKU}
                         onChange={handleChange}
                        type="text" 
                        className="h-9 text-sm" 
                        placeholder="Enter product SKU" />
                </div>

                <div className="w-100">
                    <Label htmlFor="reason" className="font-bold">
                        Product Type
                    </Label>
                    <Select name="productType"
                            value={BasicInfo.productType}
                            onValueChange={(val) => handleSelectChange("productType", val)}>
                        <SelectTrigger className="w-[100%] h-9">
                            <SelectValue placeholder="Electronics" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Electronics">Electronics</SelectItem>
                                <SelectItem value="Home">Home</SelectItem>
                                <SelectItem value="Grocery">Grocery</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-100">
                    <Label htmlFor="reason" className="font-bold">
                        Category
                    </Label>
                    <Select 
                    name="category"
                    value={BasicInfo.category}
                             onValueChange={(val) => handleSelectChange("category", val)}>
                        <SelectTrigger className="w-[100%] h-9">
                            <SelectValue placeholder="all" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Electronics">Electronics</SelectItem>
                                <SelectItem value="Home">Home</SelectItem>
                                <SelectItem value="Grocery">Grocery</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-100">
                    <Label htmlFor="brand" className="font-bold">
                        Brand
                    </Label>
                    <Select 
                    name="brand"
                    value={BasicInfo.brand}
                             onValueChange={(val) => handleSelectChange("brand", val)}>
                        <SelectTrigger className="w-[100%] h-9">
                            <SelectValue placeholder="Electronics" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="LG">LG</SelectItem>
                                <SelectItem value="BOSCH">BOSCH</SelectItem>
                                <SelectItem value="Lenova">Lenova</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-100">
                    <Label htmlFor="description" className="font-bold">
                        Description
                    </Label>
                    <Textarea name="description"  onChange={handleChange} value={BasicInfo.description} id="description" />
                </div>

                <div className="w-100">
                    <Label htmlFor="sdescription" className="font-bold">
                        Short Description
                    </Label>
                    <Textarea name="shortDescription"  onChange={handleChange} value={BasicInfo.shortDescription} />
                </div>

            </div>
        </div>
    )
}

export default ProductInfo;