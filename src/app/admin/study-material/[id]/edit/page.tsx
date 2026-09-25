"use client";

import { use } from "react";

import StudyMaterialForm from "@/components/study-material/StudyMaterialForm";
import { studyMaterial } from "@/data/studyMaterial";

type EditStudyMaterialPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default function EditStudyMaterialPage({
    params,
}: EditStudyMaterialPageProps) {
    const { id } = use(params);

    const material = studyMaterial.find(
        (item) => item.id === Number(id)
    );

    if (!material) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                    Study material not found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    The requested study material does not exist.
                </p>
            </div>
        );
    }

    return (
        <StudyMaterialForm
            mode="edit"
            material={material}
        />
    );
}

